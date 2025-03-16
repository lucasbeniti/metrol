import { toast } from "sonner";

export const handleExport = async (callRoute: string, fileName: string) => {
    try {
      const response = await fetch(route(callRoute));

      if (!response.ok) {
        throw new Error('Não foi possível exportar a planilha!');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Planilha exportada com sucesso!');
    } catch (error) {
      toast.error('Não foi possível exportar a planilha!');
      console.error(error);
    }
}