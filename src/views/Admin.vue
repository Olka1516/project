<template>
    <div class="forBackground">
        <header>
            <Button class="settingBtn" type="button" @click="visibleLeft = true" icon="pi pi-user" />
            <Sidebar v-model:visible="visibleLeft" :baseZIndex="10000">
                <h3>{{ t("language") }}</h3>
                <hr>
                <Button icon="pi pi-globe" @click="locale = 'en'" label='English' class="p-button-text" />
                <Button icon="pi pi-globe" @click="locale = 'ua'" label='Українська' class="p-button-text" />
                <h3>{{ t("quit") }}</h3>
                <hr>
                <Button icon="pi pi-sign-out" @click="quit" label="Exit" class="p-button-text" />
            </Sidebar>
            <h1>Gfamily</h1>
        </header>
        <hr>
        <section>
            <h1>{{ t("hello") }}{{ name }}</h1>
            <h2>{{ t("advice") }}</h2>
            <Button class="setCountTrainings" @click="set8">{{ t("topUp") }} 8</Button>
            <Button class="setCountTrainings" @click="set12">{{ t("topUp") }} 12</Button>
            <Button class="setCountTrainings" @click="decrease" :label='t("decrease")' />
        </section>
        <hr>
        <footer class="table">
            <DataTable :value="customers.storeClients" editMode="cell" :paginator="true"
                @cell-edit-complete="onCellEditComplete" class="p-datatable-customers editable-cells-table" :rows="10"
                dataKey="id" :rowHover="true" v-model:selection="selectedClient" v-model:filters="filters"
                filterDisplay="menu" :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 25, 50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                :globalFilterFields="['name', 'role', 'phone']" responsiveLayout="scroll">
                <template #header>
                    <div class="tableTop">
                        <h5 class="m-0">{{ t("customers") }}</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder='Search' />
                        </span>
                    </div>
                </template>
                <template #empty>{{ t("noCustomers") }}</template>
                <template #loading> {{ t("loading") }}</template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="name" :header='t("name")' sortable style="min-width: 14rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                            placeholder="Search by name" />
                    </template>
                </Column>
                <Column field="role" :header='t("role")' sortable filterMatchMode="contains" style="min-width: 14rem">
                    <template #body="{ data }">
                        {{ data.role }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                            placeholder="Search by role" />
                    </template>
                </Column>
                <Column :header='t("count")' :field="'count'" :key="'count'" sortable sortField="count"
                    filterField="count" dataType="numeric" style="min-width: 14rem" filter>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                            class="p-column-filter" />
                    </template>
                </Column>
                <Column field="inTrainings" :header='t("trainings")' sortable style="min-width: 14rem">
                    <template #body="{ data }">
                        {{ data.inTrainings }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                            placeholder="Search by training status" />
                    </template>
                </Column>
                <Column field="date" :header='t("clientBirthday")' sortable dataType="date" style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ d(new Date(+data.date.seconds * 1000), 'short') }}
                    </template>
                    <template #filter="{ filterModel }">
                        <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                    </template>
                </Column>
                <Column field="phone" :header='t("clientPhone")' sortable dataType="numeric" style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.phone }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputNumber v-model="filterModel.value" />
                    </template>
                </Column>
                <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                    <template #body>
                        <Button type="button" icon="pi pi-cog"></Button>
                    </template>
                </Column>
            </DataTable>
        </footer>
    </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Sidebar from 'primevue/sidebar';
import Column from "primevue/column";
import InputNumber from "primevue/inputnumber";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useClientsStore } from "@/service";
import { useUserStore } from "@/stores";
import { ref, onMounted, computed, reactive } from "vue";

const userStore = useUserStore();
const { t, d, locale } = useI18n();
const router = useRouter();
const selectedClient = ref();
const loading = ref(true);
const visibleLeft = ref(false);
const name = computed(() => userStore.name);
const customers = useClientsStore();
onMounted(() => {
    customers.fetchClients();
    loading.value = false;
});
const quit = async () => {
    await userStore.signOutClient()
    await router.push("/");
}
const filters: any = ref({
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
    date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    phone: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
});
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

const set8 = () => {
    userStore.set8(selectedClient.value);
    customers.fetchClients();
};
const set12 = () => {
    userStore.set12(selectedClient.value);
    customers.fetchClients();
};

const decrease = () => {
    userStore.decrease(selectedClient.value);
    customers.fetchClients();
};
</script>
<style scoped>
.forBackground {
    width: 100%;
    min-height: 100vh;
    background-color: #D0E5EC;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.setCountTrainings {
    color: white;
    border: none;
    margin: 40px 15px;
    width: 220px;
    height: 23px;
    background-color: #00589B;
    border-radius: 0.25rem;
    padding: 0;
    display: inline-block;
    font-size: 14px;
}

header {
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

h1 {
    font-size: 40px;
}

h2 {
    font-size: 20px;
}

.table {
    padding: 30px;
}

.tableTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.settingBtn {
    margin: 10px;
    border: none;
    background-color: #00589B;
    border-radius: 18px;
}

button.settingBtn:hover {
    background-color: #2196F3;
}

.p-button-text {
    margin-left: 34px;
}

@media screen and (max-width: 992px) {
    .table {
        padding: 0;
    }
}
</style>
 