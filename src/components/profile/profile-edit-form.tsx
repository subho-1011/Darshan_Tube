"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardFooter } from "@/components/ui/card";

import { CheckIcon, LoaderIcon, Save, X } from "lucide-react";

import { IProfileData } from "@/lib/types";
import { useProfileData } from "@/hooks/users";

export const ProfileEditForm: React.FC<{
    profileData: IProfileData | null;
    toggleEditButton: () => void;
}> = ({ toggleEditButton }) => {
    const { isPending, form, onSubmit, websiteInputRef, addWebsite, removeWebsite } = useProfileData();

    return (
        <>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Select
                                                defaultValue={field.value}
                                                onValueChange={(value) => field.onChange(value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="others">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Birthday</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="dd/mm/yyyy" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="websites"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <>
                                            {field.value?.map((website, index) => (
                                                <div className="flex" key={index}>
                                                    <Input placeholder="https://" defaultValue={website} />
                                                    <Button
                                                        className="ml-4"
                                                        variant="destructive"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            removeWebsite(website);
                                                        }}
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <div className="flex">
                                                <Input placeholder="https://" ref={websiteInputRef} />
                                                <Button
                                                    className="ml-4 bg-emerald-500 hover:bg-emerald-600"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addWebsite();
                                                    }}
                                                >
                                                    <CheckIcon className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <div className="flex space-x-6">
                    <Button onClick={toggleEditButton} variant="destructive">
                        <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>
                        {isPending ? <LoaderIcon className="h-4 w-4 animate-spin" /> : null}
                        <Save className="mr-2 h-4 w-4" /> Save
                    </Button>
                </div>
            </CardFooter>
        </>
    );
};
