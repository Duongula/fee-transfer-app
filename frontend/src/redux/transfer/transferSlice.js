import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    transfers: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

// create transfer
export const createTransfer = createAsyncThunk("transfer/create", async (transferData, thunkAPI) => {
    try {
        const response = await fetch('/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transferData)
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message)
        return thunkAPI.rejectWithValue("Something went wrong");
    }
});

// get all transfers
export const getTransfers = createAsyncThunk("transfer/getTransfers", async (_, thunkAPI) => {
    try {
        const response = await fetch('/transfer');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue("Something went wrong");
    }
})

// initial state
const transferSlice = createSlice({
    name: "transfer",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransfer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTransfer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transfers.push(action.payload);
            })
            .addCase(createTransfer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTransfers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTransfers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transfers = action.payload;
            })
            .addCase(getTransfers.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = transferSlice.actions;
export default transferSlice.reducer;