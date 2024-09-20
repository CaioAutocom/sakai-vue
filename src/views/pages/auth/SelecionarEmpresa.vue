<script setup>
import { useAuthStore } from '@/store/authStore.ts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const dropdownValue = ref(null);
const loading = ref(false);

const onSubmit = async () => {
    loading.true;
    await authStore.obterToken();
    if (authStore.token) {
        router.push('/app');
    }
};

const onSelectTenant = (company) => {
    authStore.setSelectedTenant(company);
};
</script>

<template>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 100%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8 items-center justify-center">
                        <div class="w-full flex flex-col items-center justify-center mb-8">
                            <img src="../../../assets/images/logotipo.png" width="150px" />
                        </div>
                        <div class="w-96"></div>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">{{ `Olá, ${authStore.user.userName}!` }}</div>
                    </div>
                    <div>
                        <form @submit.prevent="onSubmit">
                            <label for="select1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Selecione a empresa</label>
                            <Select pt:root:id="select1" v-model="dropdownValue" :options="authStore.user.tenants" optionLabel="name" placeholder="Empresa" class="mb-8" @change="onSelectTenant(dropdownValue)" fluid />
                            <Button label="Continuar" class="w-full" type="submit" :loading="loading"></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
