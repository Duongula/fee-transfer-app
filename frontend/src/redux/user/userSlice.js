import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    account: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}


// resgister user (action)
export const registerUser = createAsyncThunk('user/register',
    async (userData, thunkApi) => {
        try {
            const res = await fetch("/users", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(userData)
            })

            const data = await res.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            return data;
        } catch (error) {
            console.log(error.message);
            return thunkApi.rejectWithValue(error.message);
        }
    });

export const logoutUser = createAsyncThunk('user/logout', async (_, thunkApi) => {
    try {
        const res = await fetch("/users/logout");
        const data = await res.json();
        localStorage.removeItem("user");
        return data;
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error.message);
    }
})


export const loginUser = createAsyncThunk('auth/login', async (userData, thunkApi) => {
    try {
        const res = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error.message)
        return thunkApi.rejectWithValue(error.message);
    }
});


// user 
const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        // handle cases here
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "User registered successfully";
                state.user = action.payload.user;
                state.account = action.payload.account;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "";
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
    },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
