export const classnames = (...classes: any[]) => {
    return classes.filter(Boolean).join(" ");
};