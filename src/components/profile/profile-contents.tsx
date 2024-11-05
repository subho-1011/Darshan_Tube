"use client";

import { format } from "date-fns";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { IProfileData } from "@/lib/types";

export const ProfileContents = ({
    profileData,
    toggleEditButton,
}: {
    profileData: IProfileData | null;
    toggleEditButton: () => void;
}) => {
    return (
        <>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Bio</h3>
                        <p>{profileData?.bio}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Details</h3>
                        <p>Gender: {profileData?.gender}</p>
                        {profileData?.birthday && <p>Birthday: {format(profileData?.birthday, "PPP")}</p>}
                        {profileData?.createdAt && <p>Member since: {format(profileData?.createdAt, "PPP")}</p>}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Websites</h3>
                        <ul className="list-disc list-inside">
                            {profileData?.websites.map((website, index) => (
                                <li key={index}>
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {website}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleEditButton();
                    }}
                >
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile Data
                </Button>
            </CardFooter>
        </>
    );
};
