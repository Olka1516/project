<template>
    <div class="forBackground">
        <header>
            <Button class="headerBtn" type="button" @click="visibleLeft = true" icon="pi pi-user" />
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
        <section>
            <hr>
            <h1>{{ t("hello") }}{{ name }}</h1>
            <h2>{{ t("advice") }}</h2>
            <Button class="mainButton" @click="set8">{{ t("topUp") }} 8</Button>
            <Button class="mainButton" @click="set12">{{ t("topUp") }} 12</Button>
            <Button class="mainButton" @click="decrease" :label='t("decrease")' />
        </section>
        <hr>
        <footer class="table">
            <DataTable :value="customers.storeClients" editMode="cell" :paginator="true"
                @cell-edit-complete="onCellEditComplete" class="p-datatable-customers editable-cells-table" :rows="10"
                dataKey="id" :rowHover="true" v-model:selection="selectedClient" v-model:filters="filters"
                filterDisplay="menu" :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[10, 25, 50]"
                :currentPageReportTemplate="t('showPage.1') + '{first}' + t('showPage.2') + '{last}' + t('showPage.3') + '{totalRecords}' + t('showPage.4')"
                :globalFilterFields="['name', 'role', 'phone']" responsiveLayout="scroll">
                <template #header>
                    <div class="tableTop">
                        <h5 class="m-0">{{ t("customers") }}</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder='Search' />
                        </span>
                        <Button @click="refresh" icon="pi pi-refresh" class="headerBtn" />
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
                <Column field="role" :header='t("role")' sortable filterMatchMode="contains" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.role }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                            placeholder="Search by role" />
                    </template>
                </Column>
                <Column :header='t("count")' :field="'count'" :key="'count'" sortable sortField="count"
                    filterField="count" dataType="numeric" style="min-width: 8rem" filter>
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
                <Column field="date" :header='t("clientBirthday")' sortable dataType="date" style="min-width: 14rem">
                    <template #body="{ data }">
                        {{ d(new Date(+data.date.seconds * 1000), 'short') }}
                    </template>
                    <template #filter="{ filterModel }">
                        <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                    </template>
                </Column>
                <Column field="phone" :header='t("clientPhone")' sortable style="min-width: 14rem">
                    <template #body="{ data }">
                        {{ data.phone }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputNumber v-model="filterModel.value" />
                    </template>
                </Column>
                <!-- <Column field="verified" header="Verified" dataType="boolean" style="min-width:6rem">
                    <template #body="{ data }">
                        <i class="pi"
                            :class="{ 'true-icon pi-check-circle': data.verified, 'false-icon pi-times-circle': !data.verified }"></i>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()" />
                    </template>
                </Column> -->
            </DataTable>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useClientsStore } from "@/service";
import { useUserStore, useStore } from "@/stores";

const userStore = useUserStore();
const store = useStore();
const customers = useClientsStore();
const router = useRouter();
const { t, d, locale } = useI18n();
const selectedClient = ref();
const loading = ref(true);
const visibleLeft = ref(false);
const name = computed(() => userStore.name);
const filters = ref(store.filters);

onMounted(async () => {
    await customers.fetchClients();
    loading.value = false;
});

const onCellEditComplete = (event: { data: any; newValue: number; field: any; } | any) => {
    store.onCellEditComplete(event)
}

const set8 = async () => {
    userStore.set8(selectedClient.value);
    await customers.fetchClients();
};
const set12 = async () => {
    userStore.set12(selectedClient.value);
    await customers.fetchClients();
};

const decrease = async () => {
    userStore.decrease(selectedClient.value);
    await customers.fetchClients();
};

const refresh = async () => {
    await customers.fetchClients();
};

const quit = async () => {
    await userStore.signOutClient()
    await router.push("/");
}
</script>
<style scoped>
@import "@/assets/adminPage.css";
</style>
 