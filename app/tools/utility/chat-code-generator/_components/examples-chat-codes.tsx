import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ChatCodeExample = {
  title: string;
  itemId: number;
  color: string;
  quantity: number;
  skinId: number | null;
  upgrade1Id: number | null;
  upgrade2Id: number | null;
};

const examples: ChatCodeExample[] = [
  {
    title: '[255 Sunrise]',
    color: '#4c139d',
    itemId: 30703,
    quantity: 255,
    skinId: null,
    upgrade1Id: 24591,
    upgrade2Id: 49447,
  },
  {
    title: '[69 Bananas of Penetration]',
    color: '',
    itemId: 12251,
    quantity: 69,
    skinId: null,
    upgrade1Id: 24887,
    upgrade2Id: null,
  },
  {
    title: '[255 Dhuum Vale]',
    color: '',
    itemId: 85633,
    quantity: 255,
    skinId: null,
    upgrade1Id: null,
    upgrade2Id: null,
  },
  {
    title: '[3 Chak Infusions]',
    color: '#ffa405',
    itemId: 81825,
    quantity: 3,
    skinId: null,
    upgrade1Id: null,
    upgrade2Id: null,
  },
  {
    title: '[2 Festive Confetti Infusions]',
    color: '#ffa405',
    itemId: 84882,
    quantity: 2,
    skinId: null,
    upgrade1Id: null,
    upgrade2Id: null,
  },
  {
    title: '[Swim-Speed Infusion +25]',
    color: '#fb3e8d',
    itemId: 87502,
    quantity: 1,
    skinId: null,
    upgrade1Id: null,
    upgrade2Id: null,
  },
];

interface ExamplesChatCodesProps {
  onApplyExample: (example: ChatCodeExample) => void;
}

export const ExamplesChatCodes = ({
  onApplyExample,
}: ExamplesChatCodesProps) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {examples.map((example, index) => (
        <li key={`example-${example.itemId}-${index}`}>
          <Button
            type="button"
            onClick={() => onApplyExample(example)}
            variant="outline"
            className="w-full overflow-hidden"
          >
            <span
              className={cn(
                'text-sm font-medium',
                example.color && 'text-white',
              )}
              style={{ color: example.color }}
            >
              {example.title}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );
};
