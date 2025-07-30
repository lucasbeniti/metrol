import { FileOutput, Loader2Icon } from 'lucide-react';
import { Button } from './ui/button';

interface ExportButtonProps {
  handleExportClick: () => void;
  isExporting: boolean;
}

const ExportButton = ({ handleExportClick, isExporting }: ExportButtonProps) => {
  return (
    <Button variant={'outline'} onClick={handleExportClick} disabled={isExporting}>
      {isExporting && <Loader2Icon className="animate-spin" />}
      <FileOutput />
      Excel
    </Button>
  );
};

export default ExportButton;
