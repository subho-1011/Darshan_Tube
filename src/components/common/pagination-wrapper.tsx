"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export interface IPaginationProps {
    page: number;
    totalPage: number;
    onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPage, onChange }: IPaginationProps) => {
    const handlePageChange = (page: number) => onChange(page);

    return (
        <div className="w-full flex items-center justify-between">
            <Button variant="outline" className="mr-2" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                <ChevronLeftIcon className="w-4 h-4 mr-2" />
                Previous
            </Button>
            <div className="flex space-x-2 items-center">
                <div>
                    {page > 2 && <span className="mr-2">...</span>}
                    {page > 1 && (
                        <Button variant="outline" className="mr-2" onClick={() => handlePageChange(page - 1)}>
                            {page - 1}
                        </Button>
                    )}
                </div>
                <Button className="mr-2" disabled>
                    {page}
                </Button>
                <div>
                    {page < totalPage && (
                        <Button variant="outline" className="mr-2" onClick={() => handlePageChange(page + 1)}>
                            {page + 1}
                        </Button>
                    )}
                    {page < totalPage - 1 && <span className="mr-2">...</span>}
                </div>
            </div>
            <Button
                variant="outline"
                className="mr-2"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPage}
            >
                Next
                <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
};

export interface IPaginationWrapperProps extends IPaginationProps {
    children: React.ReactNode;
}

export function PaginationWrapper({ children, page, totalPage, onChange }: IPaginationWrapperProps) {
    return (
        <div className="w-full min-h-[calc(100vh-60px)] flex flex-col justify-between space-y-4">
            {children}
            <Pagination page={page || 1} totalPage={totalPage || 1} onChange={onChange} />
        </div>
    );
}
