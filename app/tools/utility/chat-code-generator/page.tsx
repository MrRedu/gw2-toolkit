'use client';

import { CodeIcon, Loader2Icon } from 'lucide-react';
import { fetchItems } from '@/services/gw2api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ItemIcon } from '@/components/atoms/item-icon';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { useChatCodeGenerator } from '@/hooks/use-chat-code-generator';
import { type Item } from '@gw2api/types/data/item';
import { HowItWorks } from './_components/how-it-works';
import { EmptyItemPreview } from './_components/empty-item-preview';
import { ItemPreview } from './_components/item-preview';
import {
  type ChatCodeExample,
  ExamplesChatCodes,
} from './_components/examples-chat-codes';

export default function ChatCodeGeneratorPage() {
  const {
    form,
    searchResults,
    isSearching,
    selectedItem,
    finalCode,
    copied,
    handleSelectItem,
    copyToClipboard,
  } = useChatCodeGenerator();

  const applyExample = async (example: ChatCodeExample) => {
    // We need to set both the form values and `selectedItem` so `finalCode` can be computed.
    const res = await fetchItems([example.itemId]);
    const item = res?.[0];
    if (!item) return;

    handleSelectItem(item);
    form.setValue('quantity', example.quantity, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    form.setValue('skinId', example.skinId ? example.skinId.toString() : '', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    form.setValue(
      'upgrade1Id',
      example.upgrade1Id ? example.upgrade1Id.toString() : '',
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
    form.setValue(
      'upgrade2Id',
      example.upgrade2Id ? example.upgrade2Id.toString() : '',
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  };

  return (
    <>
      <header className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-600/10 border border-blue-700/30">
                <CodeIcon className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
                Chat Code Generator
              </h1>
            </div>
            <p className="text-sm text-black/80 dark:text-white/80 max-w-md">
              Generate funny, unusual and unique chat codes for items, skills,
              and more.
            </p>
          </div>
        </div>
      </header>

      <HowItWorks />

      <div className="@container">
        <div className="max-w-6xl mx-auto py-8 md:py-12 lg:py-16 grid grid-cols-1 @[910px]:grid-cols-3 gap-10 ">
          {/* Form Group using Shadcn FieldGroup */}
          <FieldGroup className="grid grid-cols-1 @[910px]:grid-cols-3 gap-x-6 gap-y-8 h-fit col-span-1 @[910px]:col-span-2">
            <Field
              className="md:col-span-2 relative group"
              data-invalid={!!form.formState.errors.itemId}
            >
              <FieldLabel htmlFor="itemId">Item ID</FieldLabel>
              <div className="relative">
                <Input
                  id="itemId"
                  placeholder="e.g., 19976 or 30689"
                  {...form.register('itemId')}
                  aria-invalid={!!form.formState.errors.itemId}
                  variant="image"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2Icon className="size-5 animate-spin text-neutral-400" />
                  </div>
                )}

                {/* Results Dropdown */}
                {form.watch('itemId').length >= 1 && !selectedItem && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 top-full">
                    {searchResults && searchResults.length > 0
                      ? searchResults.map((item: Item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectItem(item)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <ItemIcon
                              src={item.icon}
                              alt={item.name}
                              size={40}
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-mono">
                                ID: {item.id}
                              </span>
                            </div>
                          </button>
                        ))
                      : !isSearching && (
                          <div className="px-4 py-6 text-center">
                            <p className="text-sm font-medium text-neutral-500 mb-1">
                              No item found
                            </p>
                            <p className="text-[10px] text-neutral-400 uppercase tracking-tight">
                              Make sure the ID is correct
                            </p>
                          </div>
                        )}
                  </div>
                )}
              </div>
              {form.formState.errors.itemId ? (
                <FieldError>{form.formState.errors.itemId.message}</FieldError>
              ) : (
                <FieldDescription>
                  Enter the official numeric identifier of the item.
                </FieldDescription>
              )}
            </Field>

            <Field data-invalid={!!form.formState.errors.quantity}>
              <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
              <Input
                id="quantity"
                type="number"
                {...form.register('quantity', { valueAsNumber: true })}
                aria-invalid={!!form.formState.errors.quantity}
                className="text-center font-mono"
                variant="image"
              />
              {form.formState.errors.quantity ? (
                <FieldError>
                  {form.formState.errors.quantity.message}
                </FieldError>
              ) : (
                <FieldDescription>Maximum 255.</FieldDescription>
              )}
            </Field>

            {/* New Fields: Skin and Upgrades */}
            <Field data-invalid={!!form.formState.errors.skinId}>
              <FieldLabel htmlFor="skinId">Skin ID (Optional)</FieldLabel>
              <Input
                id="skinId"
                placeholder="e.g., 4667"
                {...form.register('skinId')}
                aria-invalid={!!form.formState.errors.skinId}
                variant="image"
              />
              {form.formState.errors.skinId ? (
                <FieldError>{form.formState.errors.skinId.message}</FieldError>
              ) : (
                <FieldDescription>Visual appearance ID.</FieldDescription>
              )}
            </Field>

            <Field data-invalid={!!form.formState.errors.upgrade1Id}>
              <FieldLabel htmlFor="upgrade1Id">Upgrade 1 (Optional)</FieldLabel>
              <Input
                id="upgrade1Id"
                placeholder="e.g., 24554"
                {...form.register('upgrade1Id')}
                aria-invalid={!!form.formState.errors.upgrade1Id}
                variant="image"
              />
              {form.formState.errors.upgrade1Id ? (
                <FieldError>
                  {form.formState.errors.upgrade1Id.message}
                </FieldError>
              ) : (
                <FieldDescription>
                  Rune, Sigil, or Infusion ID.
                </FieldDescription>
              )}
            </Field>

            <Field data-invalid={!!form.formState.errors.upgrade2Id}>
              <FieldLabel htmlFor="upgrade2Id">Upgrade 2 (Optional)</FieldLabel>
              <Input
                id="upgrade2Id"
                placeholder="e.g., 24615"
                {...form.register('upgrade2Id')}
                aria-invalid={!!form.formState.errors.upgrade2Id}
                variant="image"
              />
              {form.formState.errors.upgrade2Id ? (
                <FieldError>
                  {form.formState.errors.upgrade2Id.message}
                </FieldError>
              ) : (
                <FieldDescription>Second upgrade slot.</FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <div className="col-span-1 @[910px]:col-span-2 md:min-h-62.5">
            <h2 className="text-lg font-bold pb-4">Examples</h2>
            <ExamplesChatCodes onApplyExample={applyExample} />
          </div>

          {/* Selected Preview */}
          <div className="w-full flex justify-center col-span-1 @[910px]:col-start-3 @[910px]:row-start-1 @[910px]:row-span-2">
            {selectedItem ? (
              <ItemPreview
                item={selectedItem}
                quantity={form.watch('quantity') || 1}
                finalCode={finalCode}
                copied={copied}
                onCopy={copyToClipboard}
                upgrade1Id={form.watch('upgrade1Id')}
                upgrade2Id={form.watch('upgrade2Id')}
              />
            ) : (
              <EmptyItemPreview />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
