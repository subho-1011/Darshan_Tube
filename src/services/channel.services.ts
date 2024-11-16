import { api, apiHandler } from "@/lib/utils";

/**
 * Channel subscription toggle.
 */
export const toggleSubscription = (channelId: string) =>
    apiHandler(async () => {
        await api.post(`/channels/${channelId}/subscribe`);
    });

export const channelServices = {
    toggleSubscription,
};
