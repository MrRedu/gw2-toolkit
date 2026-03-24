'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useCallback, useEffect } from 'react';
import { useItemSearch } from './use-item-search';
import { encodeChatCode } from '@/utils/gw2-encoder';
import { type GW2Item } from '@/types/gw2';

export const chatCodeSchema = z.object({
  itemId: z
    .string()
    .min(1, 'El ID es requerido')
    .regex(/^\d+$/, 'Debe ser un ID numérico'),
  quantity: z.number().int().min(1, 'Mínimo 1').max(255, 'Máximo 255'),
  skinId: z
    .string()
    .regex(/^\d*$/, 'Opcional, debe ser un ID numérico')
    .optional(),
  upgrade1Id: z
    .string()
    .regex(/^\d*$/, 'Opcional, debe ser un ID numérico')
    .optional(),
  upgrade2Id: z
    .string()
    .regex(/^\d*$/, 'Opcional, debe ser un ID numérico')
    .optional(),
});

export type ChatCodeFormValues = z.infer<typeof chatCodeSchema>;

export const useChatCodeGenerator = () => {
  const [selectedItem, setSelectedItem] = useState<GW2Item | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<ChatCodeFormValues>({
    resolver: zodResolver(chatCodeSchema),
    defaultValues: {
      itemId: '',
      quantity: 1,
      skinId: '',
      upgrade1Id: '',
      upgrade2Id: '',
    },
    mode: 'onChange',
  });

  const itemId = form.watch('itemId');
  const quantity = form.watch('quantity');
  const skinId = form.watch('skinId');
  const upgrade1Id = form.watch('upgrade1Id');
  const upgrade2Id = form.watch('upgrade2Id');

  const { data: searchResults, isLoading: isSearching } = useItemSearch(itemId);

  const finalCode = selectedItem
    ? encodeChatCode({
        itemId: selectedItem.id,
        quantity: Math.min(Math.max(1, quantity), 255),
        skinId: skinId ? parseInt(skinId) : undefined,
        upgrade1Id: upgrade1Id ? parseInt(upgrade1Id) : undefined,
        upgrade2Id: upgrade2Id ? parseInt(upgrade2Id) : undefined,
      })
    : '[&]';

  const handleSelectItem = useCallback(
    (item: GW2Item) => {
      setSelectedItem(item);
      form.setValue('itemId', item.id.toString());
    },
    [form],
  );

  const copyToClipboard = useCallback(() => {
    if (!selectedItem) return;
    navigator.clipboard.writeText(finalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [finalCode, selectedItem]);

  // Si el usuario cambia el ID manualmente y ya no coincide con el objeto seleccionado,
  // podríamos querer limpiar el objeto seleccionado, pero para esta herramienta
  // es mejor dejarlo hasta que se seleccione uno nuevo o se borre.
  // Sin embargo, si el ID está vacío, limpiamos.
  useEffect(() => {
    if (!itemId) {
      setSelectedItem(null);
    }
  }, [itemId]);

  return {
    form,
    searchResults,
    isSearching,
    selectedItem,
    finalCode,
    copied,
    handleSelectItem,
    copyToClipboard,
  };
};
