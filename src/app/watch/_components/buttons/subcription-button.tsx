"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "@/lib/utils";
// import { toggleSubscription } from "@/store/thunk-api/subscriptions.thunkapi";
import { Button } from "@/components/ui/button";
import { toggleSubscribe } from "@/store/thunk-api/videodata.thunk-api";

export const SubscribeButton: React.FC<{
    channelId: string;
    isSubscribed: boolean;
}> = ({ channelId, isSubscribed }) => {
    const dispatch = useAppDispatch();

    const handleSubscrition = () => dispatch(toggleSubscribe({ channelId }));

    return (
        <AnimatePresence mode="wait">
            {isSubscribed ? (
                <Button onClick={handleSubscrition}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.span
                            key="action"
                            className="relative block h-full w-full font-semibold"
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                        >
                            Subscribed
                        </motion.span>
                    </motion.div>
                </Button>
            ) : (
                <Button variant="outline" onClick={handleSubscrition}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.span
                            key="reaction"
                            className="relative block font-semibold"
                            initial={{ x: 0 }}
                            exit={{ x: 50, transition: { duration: 0.5 } }}
                        >
                            Subscribe
                        </motion.span>
                    </motion.div>
                </Button>
            )}
        </AnimatePresence>
    );
};
