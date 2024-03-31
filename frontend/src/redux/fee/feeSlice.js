import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks
export const getFee = createAsyncThunk('fee/getFee', async ({ studentId, date }, thunkAPI) => {
    try {
        const response = await fetch(`/fee?studentId=${studentId}&date=${date}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createFee = createAsyncThunk('fee/createFee', async (feeData, thunkAPI) => {
    try {
        const response = await fetch('/fee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feeData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// Slice
const feeSlice = createSlice({
    name: 'fee',
    initialState: {
        fee: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearFee: (state) => {
            return {
                ...state,
                fee: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFee.fulfilled, (state, action) => {
                state.fee = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getFee.rejected, (state, action) => {
                state.fee = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createFee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFee.fulfilled, (state, action) => {
                state.fee = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(createFee.rejected, (state, action) => {
                state.fee = null;
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearFee } = feeSlice.actions;

export default feeSlice.reducer;