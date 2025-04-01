import React from 'react';
import { Download } from 'lucide-react';

import { Button } from '../components/ui/button';

function FileAttachment({ fileName, fileUrl, fileType }) {
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'ppt':
      case 'pptx':
        return '📊';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📁';
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const truncatedFileName =
    fileName.length > 15 ? fileName.substring(14, 28) + '...' : fileName;

  return (
    <div className="flex items-center space-x-3 p-2 bg-primary rounded-md w-full max-w-md">
      <div className="text-2xl">{getFileIcon(fileType)}</div>

      <div className="flex-1">
        <p className="text-sm font-medium truncate">{truncatedFileName}</p>
        <p className="text-xs text-muted-foreground uppercase">{fileType}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDownload}
        title="Download"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}

export { FileAttachment };