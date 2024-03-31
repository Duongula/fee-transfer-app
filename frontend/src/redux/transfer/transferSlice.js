import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    transfers: [],
    otps: null,
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
        if (response.ok) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
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
        // console.log("get trans", data);
        return data;
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue("Something went wrong");
    }
})

export const sendOtpCode = createAsyncThunk("transfer/sendOtpCode", async (dataSend, thunkAPI) => {
    try {
        const response = await fetch('/transfer/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
        const data = await response.json();
        if (response.ok) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        return data;
    } catch (error) {
        console.log(error.message)
        return thunkAPI.rejectWithValue("Something went wrong");
    }
})

export const sendInvoice = createAsyncThunk("transfer/sendInvoice", async (dataSend, thunkAPI) => {
    try {
        const response = await fetch('/transfer/send-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
        const data = await response.json();
        if (response.ok) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        return data;
    } catch (error) {
        console.log(error.message)
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
                const payloadArray = Array.isArray(action.payload) ? action.payload : [action.payload.transfer];
                // console.log("payload", payloadArray);
                // console.log("state", state);
                state.transfers.push(...payloadArray);
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
                state.transfers = Array.isArray(action.payload.transfers) ? action.payload.transfers : [action.payload.transfers];
            })
            .addCase(getTransfers.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendOtpCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendOtpCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.otps = action.payload;
            })
            .addCase(sendOtpCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendInvoice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(sendInvoice.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = transferSlice.actions;
export default transferSlice.reducer;