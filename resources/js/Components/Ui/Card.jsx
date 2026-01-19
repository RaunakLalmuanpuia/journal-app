import React from "react";

const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card"
        className={`bg-white text-gray-900 flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${className || ""}`}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-header"
        className={`@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] border-b-0 ${className || ""}`}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-title"
        className={`leading-none font-semibold ${className || ""}`}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-description"
        className={`text-gray-500 text-sm ${className || ""}`}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardAction = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-action"
        className={`col-start-2 row-span-2 row-start-1 self-start justify-self-end ${className || ""}`}
        {...props}
    />
));
CardAction.displayName = "CardAction";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-content"
        className={`px-6 ${className || ""}`}
        {...props}
    />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-footer"
        className={`flex items-center px-6 pt-0 ${className || ""}`}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
};
