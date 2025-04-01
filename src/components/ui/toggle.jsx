import React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { Toast, ToastClose, ToastDescription, ToastTitle } from '../../components/ui/toast';
import { useToast } from '../../components/ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
    </div>
  );
}

export function Toggle({ className, variant, size, ...props }, ref) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground ${className}`}
      {...props}
    />
  );
}
