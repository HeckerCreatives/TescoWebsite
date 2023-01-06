import axios from 'axios'
import React from 'react'
import { useMutation } from 'react-query'

const createTeacher=(data)=>{
    return axios.post('http://localhost:5000/api/create-teacher',data)
}

export const UseCreateTeacherHooks=()=>{
    return useMutation(createTeacher)
}