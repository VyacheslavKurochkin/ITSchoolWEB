<template>
    <h1 class="mb-3">Телефонная книга</h1>
    <form @submit.prevent="createContact" class="row mb-3">
        <h2 class="h5">Добавить контакт</h2>
        <div class="col-md-5">
            <input v-model="name"
                   @keydown="isInvalidName = false"
                   :class="{'is-invalid': isInvalidName}"
                   type="text"
                   class="form-control"
                   placeholder="Имя">
            <div id="validationEditName" class="invalid-feedback">
                Поле обязательно для заполнения
            </div>
        </div>
        <div class="col-md-3">
            <input v-model="phone"
                   @keydown="isInvalidPhone = false"
                   :class="{'is-invalid': isInvalidPhone}"
                   type="text"
                   class="form-control"
                   placeholder="Телефон">
            <div id="validationEditPhone" class="invalid-feedback">
                Поле обязательно для заполнения
            </div>
        </div>
        <div class="col-2">
            <button class="btn btn-primary">Добавить</button>
        </div>
    </form>
    <form @submit.prevent="loadContacts" class="mb-3">
        <h2 class="h5">Поиск контактов</h2>
        <div class="row row-cols-lg-auto g-3 align-items-center">
            <div class="col-12">
                <input v-model="term" type="text" class="form-control" placeholder="Текст поиска">
            </div>
            <div class="col-12">
                <button class="btn btn-primary">Поиск</button>
            </div>
        </div>
    </form>
    <div class="table" v-cloak>
        <table class="table table-striped text-center">
            <thead>
            <tr class="align-middle">
                <th class="col-1">№</th>
                <th class="col-4">Имя</th>
                <th class="col-4">Телефон</th>
                <th></th>
            </tr>
            </thead>
            <tbody class="align-middle">
            <tr v-for="(contact, index) in contacts" :key="contact.id" class="p-3">
                <td v-text="index + 1"></td>
                <td v-if="(index !== editingIndex)" v-text="contact.name"></td>
                <td v-else class="">
                    <div class="input-group has-validation">
                        <input @keydown="isInvalidEditName = false"
                               @keyup.enter="showSaveContactConfirm(contact)"
                               v-model.trim="editingName"
                               :class="{'is-invalid': isInvalidEditName}"
                               class="form-control"
                               type="text">
                    </div>
                </td>
                <td v-if="index !== editingIndex" v-text="contact.phone"></td>
                <td v-else class="">
                    <div class="input-group has-validation">
                        <input @keydown="isInvalidEditPhone = false"
                               @keyup.enter="showSaveContactConfirm(contact)"
                               v-model.trim="editingPhone"
                               :class="{'is-invalid': isInvalidEditPhone}"
                               class="form-control"
                               type="text">
                    </div>
                </td>
                <td v-if="index !== editingIndex" class="">
                    <div class="row justify-content-end">
                        <div class="col">
                            <button
                                @click="editingIndex = index; editingName = contact.name; editingPhone = contact.phone"
                                class="btn btn-primary me-2 col-auto"
                                type="button">
                                Редактировать
                            </button>
                            <button @click="showDeleteContactConfirm(contact)" class="btn btn-danger col-auto"
                                    type="button">
                                Удалить
                            </button>
                        </div>
                    </div>
                </td>
                <td v-else class="">
                    <div class="row justify-content-end">
                        <div class="col">
                            <button @click="showSaveContactConfirm(contact)" class="btn btn-primary me-2 col-auto"
                                    type="button">
                                Сохранить
                            </button>
                            <button @click="editingIndex = -1" class="btn btn-danger col-auto" type="button">
                                Отменить
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div ref="errorModalDialog" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Действие не выполнено</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
              <span v-text="errorDescription" class="h4">
              </span>
                </div>
                <div class="modal-footer">
                    <button @click="" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div ref="saveConfirmModalDialog" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Подтверждение сохранения изменений</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
              <span class="h4">
                Сохранить изменения контакта ?
              </span>
                </div>
                <div class="modal-footer">
                    <button @click="editingIndex=-1" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Отмена
                    </button>
                    <button @click="saveContact()" type="button" class="btn btn-danger">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div ref="deleteConfirmModalDialog" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Подтверждение удаления</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Удалить выбранный контакт ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Отмена
                    </button>
                    <button @click="deleteContact()" type="button" class="btn btn-danger">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import PhoneBookService from "./phoneBookService";

export default {
    name: "app",
    data() {
        return {
            contacts: [],
            term: "",
            name: "",
            phone: "",
            service: new PhoneBookService(),
            deleteConfirmDialog: null,
            saveConfirmDialog: null,
            errorDialog: null,
            selectedContact: null,
            isInvalidName: false,
            isInvalidPhone: false,
            editingIndex: -1,
            editingName: "",
            isInvalidEditName: false,
            editingPhone: "",
            isInvalidEditPhone: false,
            errorDescription: ""

        };
    },

    created() {
        this.loadContacts();
    },

    mounted() {
        this.deleteConfirmDialog = new bootstrap.Modal(this.$refs.deleteConfirmModalDialog, {});
        this.saveConfirmDialog = new bootstrap.Modal(this.$refs.saveConfirmModalDialog, {});
        this.errorDialog = new bootstrap.Modal(this.$refs.errorModalDialog, {});
    },

    methods: {
        createContact() {
            if (this.name.trim().length === 0) {
                this.isInvalidName = true;
            }

            if (this.phone.trim().length === 0) {
                this.isInvalidPhone = true;
            }

            if (this.isInvalidName || this.isInvalidPhone) {
                return;
            }

            const contact = {
                name: this.name,
                phone: this.phone
            }

            this.service.createContact(contact).then(response => {
                if (!response.success) {
                    this.showErrorDialog(response.message);

                    return;
                }

                this.name = "";
                this.phone = "";

                this.loadContacts();
            }).catch(() => this.showErrorDialog("Новый контакт не добавлен"));
        },

        saveContact() {
            const contact = {
                id: this.selectedContact.id,
                name: this.editingName,
                phone: this.editingPhone
            }

            this.service.updateContact(contact).then(response => {
                if (!response.success) {
                    this.showErrorDialog(response.message);

                    return;
                }

                this.saveConfirmDialog.hide();

                this.selectedContact.name = this.editingName;
                this.selectedContact.phone = this.editingPhone;
            }).catch(() => this.showErrorDialog("Контакт не изменен"))
                .finally(() => this.saveConfirmDialog.hide());

            this.editingIndex = -1;
        },

        showSaveContactConfirm(contact) {
            if (this.editingName.length === 0) {
                this.showErrorDialog("Поле 'Имя' обязательно для заполнения !");

                this.isInvalidEditName = true;
            }

            if (this.editingPhone.length === 0) {
                this.showErrorDialog("Поле 'Телефон' обязательно для заполнения !");

                this.isInvalidEditPhone = true;
            }

            if (this.isInvalidEditPhone || this.isInvalidEditName) {
                return;
            }

            this.selectedContact = contact;
            this.saveConfirmDialog.show();
        },

        showDeleteContactConfirm(contact) {
            this.selectedContact = contact;
            this.deleteConfirmDialog.show();
        },

        showErrorDialog(errorText) {
            this.errorDescription = errorText;
            this.errorDialog.show();
        },

        deleteContact() {
            this.deleteConfirmDialog.hide();
            this.service.deleteContact(this.selectedContact.id).then(response => {
                if (!response.success) {
                    this.showErrorDialog(response.message);

                    return;
                }

                this.loadContacts();
            }).catch(() => this.showErrorDialog("Контакт не удален"));
        },

        loadContacts() {
            this.service.getContacts(this.term).then(contacts => {
                this.contacts = contacts;
            }).catch(() => this.showErrorDialog("Список контактов не загружен"));
        }
    }
};
</script>