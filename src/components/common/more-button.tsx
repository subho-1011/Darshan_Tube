"use client";

import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// more button props
export interface IMoreButton {
    label: string;
    icon?: JSX.Element;
    onClick?: () => void;
    subMenu?: {
        label: string;
        icon: JSX.Element;
        onClick: () => void;
    }[];
}

interface IMoreButtonProps {
    buttons: IMoreButton[];
    className?: string;
    children?: React.ReactNode;
}

/**
 * More button component
 * @param buttons - Array of buttons to be displayed in the dropdown menu
 * @example
 * <MoreButton buttons={[
 *  {
 *      label: "Edit",
 *      onClick: () => {},
 *      icon: <PencilIcon className="w-4 h-4" />
 *  },
 *  {
 *      label: "Delete",
 *      onClick: () => {},
 *      icon: <TrashIcon className="w-4 h-4" />
 *  },
 *  {
 *      label: "Privacy",
 *      onClick: () => {},
 *      icon: <LockIcon className="w-4 h-4" />,
 *      subMenu: [
 *          { label: "Public", onClick: () => {} },
 *          { label: "Private", onClick: () => {} }
 *      ]
 *  }
 * ]} />
 */
export const MoreButtons: React.FC<IMoreButtonProps> = ({ buttons, className, children }) => {
    return (
        <div className={cn("absolute top-2 right-2 z-10", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {buttons.map((button) => (
                        <span key={button.label}>
                            {!button?.subMenu ? (
                                <DropdownMenuItem key={button.label} onClick={button.onClick}>
                                    {button?.icon}
                                    {button.label}
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuSub key={button.label}>
                                    <DropdownMenuSubTrigger className="w-full">
                                        {button?.icon}
                                        {button.label}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        {button.subMenu.map((subButton) => (
                                            <DropdownMenuItem key={subButton.label} onClick={subButton.onClick}>
                                                {subButton.icon}
                                                {subButton.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            )}
                        </span>
                    ))}
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
