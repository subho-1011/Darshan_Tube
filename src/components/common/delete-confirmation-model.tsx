"use client";

import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

interface DeleteConfirmationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    deleteType: string;
    title?: string;
    description?: string;
    onConfirm?: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    open,
    onOpenChange,
    deleteType,
    title,
    description,
    onConfirm,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title ? title : `Delete ${deleteType}`}</DialogTitle>
                    <DialogDescription>
                        {description ? description : `Are you sure you want to delete this ${deleteType}?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={onConfirm}>
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
