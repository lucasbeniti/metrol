import { FileOutput } from 'lucide-react';
import { Button } from './ui/button';

interface ExportButtonProps {
  handleExportClick: () => void;
}

const ExportButton = ({ handleExportClick }: ExportButtonProps) => {
  return (
    <Button variant={'outline'} onClick={handleExportClick}>
      <FileOutput />
      Excel
    </Button>
  );
};

export default ExportButton;
