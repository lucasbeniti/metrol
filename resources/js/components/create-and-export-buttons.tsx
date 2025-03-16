import { FileOutput, PlusIcon } from 'lucide-react';
import { Button } from './ui/button';

interface CreateAndExportButtonsProps {
  handleCreateClick: () => void;
  handleExportClick: () => void;
}

const CreateAndExportButtons = ({ handleCreateClick, handleExportClick }: CreateAndExportButtonsProps) => {
  return (
    <div className="ml-auto flex gap-2">
      <Button className="w-fit" variant={'outline'} onClick={handleCreateClick}>
        <PlusIcon />
        Criar
      </Button>

      <Button variant={'outline'} onClick={handleExportClick}>
        <FileOutput />
        Excel
      </Button>
    </div>
  );
};

export default CreateAndExportButtons;
