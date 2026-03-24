// constants/gw2.ts
export const CHAT_LINK_TYPES = {
  ITEM: 0x02,
};

export const ITEM_FLAGS = {
  NONE: 0x00,
  SKIN: 0x80,
  UPGRADE_1: 0x40,
  UPGRADE_2: 0x20,
};

export interface GW2Item {
  id: number;
  name: string;
  icon: string;
  chat_link: string;
}

interface EncodeParams {
  itemId: number;
  quantity?: number;
  skinId?: number;
  upgrade1Id?: number;
  upgrade2Id?: number;
}

export const encodeChatCode = ({
  itemId,
  quantity = 1,
  skinId,
  upgrade1Id,
  upgrade2Id,
}: EncodeParams): string => {
  // Tamaño del buffer:
  // 2 (Header: Type + Qty)
  // + 3 (Item ID)
  // + 1 (Flags)
  // + optional 4 (Skin ID)
  // + optional 4 (Upgrade 1 ID)
  // + optional 4 (Upgrade 2 ID)
  let size = 6;
  if (skinId) size += 4;
  if (upgrade1Id) size += 4;
  if (upgrade2Id) size += 4;

  const buffer = new ArrayBuffer(size);
  const view = new DataView(buffer);
  let offset = 0;

  // 1. Tipo y Cantidad (2 bytes)
  view.setUint8(offset++, CHAT_LINK_TYPES.ITEM);
  view.setUint8(offset++, Math.min(Math.max(1, quantity), 255));

  // 2. Item ID (3 bytes, Little Endian)
  view.setUint8(offset++, itemId & 0xff);
  view.setUint8(offset++, (itemId >> 8) & 0xff);
  view.setUint8(offset++, (itemId >> 16) & 0xff);

  // 3. Flags de contenido extra (1 byte)
  let flags = ITEM_FLAGS.NONE;
  if (skinId) flags |= ITEM_FLAGS.SKIN;
  if (upgrade1Id) flags |= ITEM_FLAGS.UPGRADE_1;
  if (upgrade2Id) flags |= ITEM_FLAGS.UPGRADE_2;
  view.setUint8(offset++, flags);

  // 4. Escribir IDs adicionales (4 bytes cada uno, Little Endian)
  if (skinId) {
    view.setUint32(offset, skinId, true);
    offset += 4;
  }
  if (upgrade1Id) {
    view.setUint32(offset, upgrade1Id, true);
    offset += 4;
  }
  if (upgrade2Id) {
    view.setUint32(offset, upgrade2Id, true);
    offset += 4;
  }

  // 5. Convertir a Base64
  const bytes = new Uint8Array(buffer);
  const binary = String.fromCharCode(...Array.from(bytes));
  return `[&${btoa(binary)}]`;
};
