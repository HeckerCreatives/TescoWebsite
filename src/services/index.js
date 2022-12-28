import { resultCellData } from "../utils/fakedata/fakedata"
const service={
    getData:({from,to,raw})=>{
        

        return new Promise((resolve,reject)=>{
            const datas=raw.slice(from,to)
            resolve({
                count:raw.length,
                data:datas
            })
        })
    }
}
export default service