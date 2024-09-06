<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { useAuthStore } from '@/store/authStore.ts';
import { computed, ref } from 'vue';

const email = ref('');
const password = ref('');
const checked = ref(false);
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);
const dropdownValue = ref(null);

const onSubmit = async () => {
    await authStore.login(email.value, password.value);
};
const onSelectCompany = (company) => {
    authStore.setSelectedCompany(company);
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 100%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8 items-center justify-center">
                        <div class="w-full flex flex-col items-center justify-center mb-8">
                            <img src="../../../assets/images/logotipo.png" width="150px" />
                        </div>
                        <div class="w-96"></div>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4" v-if="!isLoggedIn">Bem vindo ao eSistem!</div>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4" v-if="isLoggedIn">{{ `Olá, ${user.userName}!` }}</div>
                        <span class="text-muted-color font-medium" v-else>Autentique-se para continuar</span>
                    </div>
                    <div>
                        <form @submit.prevent="onSubmit">
                            <template v-if="isLoggedIn">
                                <label for="select1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Selecione a empresa</label>
                                <Select pt:root:id="select1" v-model="dropdownValue" :options="user.tenants" optionLabel="name" placeholder="Empresa" class="mb-8" @change="onSelectCompany(dropdownValue)" fluid />
                            </template>
                            <template v-else>
                                <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                                <InputText pt:root:id="email1" type="text" placeholder="Endereço de email" class="w-full md:w-[30rem] mb-8" v-model="email" />

                                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                                <Password pt:pcInput:root:id="password1" v-model="password" placeholder="Senha" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                    <div class="flex items-center">
                                        <Checkbox v-model="checked" pt:input:id="rememberme1" binary class="mr-2"></Checkbox>
                                        <label for="rememberme1">Lembre-me</label>
                                    </div>
                                    <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Esqueceu a senha?</span>
                                </div>
                            </template>
                            <Button label="Entrar" class="w-full" type="submit" v-if="!isLoggedIn"></Button>
                            <Button label="Continuar" class="w-full" type="submit" v-else></Button>
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
