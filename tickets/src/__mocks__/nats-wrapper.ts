

export const natsWrapper = {
    client :{
        publish:( Subject : string, data: string , callback:() => void) => {
            callback();
        },
    }
};