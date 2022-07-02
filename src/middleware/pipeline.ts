type Middleware = (ctx?: any, next?: any) => void;

const pipeline = (...args: Middleware[] | any) => {
    if (!args.length) {
        return null;
    }

    const middlewares: Middleware[] = [...args];
    const context = middlewares.shift();
    const finalMethod = middlewares.pop();

    if (typeof context === 'function' || !context) {
        return null;
    }

    if (typeof finalMethod !== 'function') {
        return null;
    }

    const pipe = async () => {
        let prevIndex = -1;

        const runner = async (index: number) => {
            if (index === prevIndex) {
                throw new Error('Called Next() too many times');
            }

            prevIndex = index;

            const middleware = middlewares[index];

            if (typeof middleware === 'undefined') {
                return finalMethod(context);
            }

            if (typeof middleware !== 'function') {
                throw new Error('Middleware is not a function');
            }

            middleware(context, () => runner(index + 1));
        };

        await runner(0);
    };

    pipe();
};

export default pipeline;
