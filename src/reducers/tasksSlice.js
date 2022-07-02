import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = [];

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('http://localhost:3001/tasks').then(res => res.json())
  return response
})

export const addTask = createAsyncThunk('tasks/addTask', async (task, { getState }) => {
  const state = getState()
  const response = await fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  }).then(res => res.json()).then(res => {
    return [...state.tasks, res]
  }).catch(err => console.error(err))
  return response
}
)


export const updateTask = createAsyncThunk('tasks/updateTask', async (task, { getState }) => {
  const state = getState();
  const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  }).then(res => res.json()
  ).then(res => {
    let tempList = [...state.tasks];
    let index = state.tasks.findIndex(t => t.id === res.id);
    tempList[index] = res;
    return [...tempList];
  }).catch(err => console.error(err));
  return response
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { getState }) => {
  const state = getState();
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE"
  }).then(res => res.json()
  ).then(() => {
    const tempList = [...state.tasks].filter(task => task.id !== id)
    return [...tempList];
  }
  ).catch(err => console.error(err));
  return response
}
)


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      return payload
    }
    );
    builder.addCase(addTask.fulfilled, (state, { payload }) => {
      return payload
    }
    );
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {

      return payload;
    }
    );
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      return payload;
    }
    );
  }
})

// Action creators are generated for each case reducer function
export const { addTasks } = tasksSlice.actions

export default tasksSlice.reducer