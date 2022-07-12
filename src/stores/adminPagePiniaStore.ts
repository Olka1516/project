import { defineStore } from 'pinia'
import { useUserStore } from "@/stores";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export const useStore = defineStore('store', () => {
    const userStore = useUserStore();
    const filters: any = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        role: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        count: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        inTrainings: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        date: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        phone: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
    };

    const onCellEditComplete = (event: { data: any; newValue: number; field: any; } | any) => {
        let { data, newValue, field } = event;
        switch (field) {
            case 'count':
                if (isPositiveInteger(newValue)) {
                    userStore.changeCount(data.id, newValue);
                    data[field] = newValue;
                } else {
                    event.preventDefault();
                }
                break;
            default:
                console.log("new value trim", newValue.trim())
                if (newValue.trim().length > 0)
                    data[field] = newValue;
                else
                    event.preventDefault();
                break;
        }
    };
    const isPositiveInteger = (val: number) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    };

    return {
        filters,
        onCellEditComplete
    }
})