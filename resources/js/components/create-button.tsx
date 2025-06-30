import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';

interface CreateButtonProps {
  handleCreateClick: () => void;
}

const CreateButton = ({ handleCreateClick }: CreateButtonProps) => {
  return (
    <Button className="w-fit" variant={'outline'} onClick={handleCreateClick}>
      <PlusIcon />
      Criar
    </Button>
  );
};

export default CreateButton;
