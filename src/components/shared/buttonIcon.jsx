import { Button, ButtonProps } from '../ui/button';

const ButtonIcon = ({ onClick, variant = 'ghost', icon, ...props }) => {
  return (
    <Button
      variant={variant}
      size="icon"
      className="h-4 py-4"
      onClick={onClick}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default ButtonIcon;