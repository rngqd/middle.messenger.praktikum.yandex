export type IInputData = {
    email?: string,
    login?: string,
    password?: string,
    repeat_password?: string,
    first_name?: string,
    display_name?: string,
    second_name?: string,
    phone?: string,
}

export type IState = {
    errors: IInputData;
    values: IInputData;
};
