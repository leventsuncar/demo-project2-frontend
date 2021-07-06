export const SIGN_IN = "SIGN_IN"
export const SIGN_OUT = "SIGN_OUT"


export function signInAction(){
    return {
        type : SIGN_IN,
        
    }
}

export function signOutAction(){
    return {
        type : SIGN_OUT,
        
    }
}