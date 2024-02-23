<template>
    <div class="container my-3">
        <h1 class="mb-3">Телефонная книга</h1>
        <form @submit.prevent="createContact" class="row mb-3">
            <h2 class="h5">Добавить контакт</h2>
            <div class="row gy-2">
                <div class="col-md-5">
                    <input v-model.trim="name"
                           @keydown="isInvalidName = false"
                           :class="{'is-invalid': isInvalidName}"
                           type="text"
                           class="form-control"
                           placeholder="Имя">
                    <div id="validation-edit-name" class="invalid-feedback">
                        Поле обязательно для заполнения
                    </div>
                </div>
                <div class="col-md-3">
                    <input v-model.trim="phone"
                           @keydown="isInvalidPhone = false"
                           :class="{'is-invalid': isInvalidPhone}"
                           type="text"
                           class="form-control"
                           placeholder="Телефон">
                    <div id="validation-edit-phone" class="invalid-feedback">
                        Поле обязательно для заполнения
                    </div>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary">Добавить</button>
                </div>
            </div>
        </form>
        <form @submit.prevent="loadContacts" class="mb-3">
            <h2 class="h5">Поиск контактов</h2>
            <div class="row row-cols-lg-auto g-2 align-items-center">
                <div class="col-12">
                    <input v-model.trim="term" type="text" class="form-control" placeholder="Текст поиска">
                </div>
                <div class="col-12">
                    <button class="btn btn-primary">Поиск</button>
                </div>
            </div>
        </form>
        <div class="table-responsive-lg" v-cloak>
            <table class="table table-striped text-center">
                <thead>
                <tr class="align-middle">
                    <th class="col-1">
                        <input :checked="contacts.length > 0 && markedContactsIndexes.length === contacts.length"
                               @click="markAllContacts"
                               class="form-check-input"
                               type="checkbox">
                    </th>
                    <th class="col-1">№</th>
                    <th class="col-4">Имя</th>
                    <th class="col-3">Телефон</th>
                    <th></th>
                </tr>
                </thead>
                <tbody class="align-middle">
                <tr v-for="(contact, index) in contacts" :key="contact.id" class="p-3">
                    <td><input :checked="markedContactsIndexes.includes(index)"
                               @click="markContact(index)"
                               class="form-check-input"
                               type="checkbox">
                    </td>
                    <td v-text="index + 1"></td>
                    <template v-if="!editingContactsIndexes.includes(index)">
                        <td v-text="contact.name"></td>
                        <td v-text="contact.phone"></td>
                        <td>
                            <div class="row justify-content-end">
                                <div class="col g-2 g-lg-0">
                                    <button @click="initEditingContact(index)"
                                            class="btn btn-primary me-2"
                                            type="button">
                                        Редактировать
                                    </button>
                                </div>
                                <div class="col g-2 g-lg-0">
                                    <button @click="showDeleteContactConfirm(index)"
                                            class="btn btn-danger"
                                            type="button">
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </td>
                    </template>
                    <template v-else>
                        <td>
                            <div class="input-group has-validation">
                                <input @keydown="contact.isInvalidEditName = false"
                                       @keyup.enter="saveContact(index)"
                                       v-model.trim="contact.editingName"
                                       :class="{'is-invalid': contact.isInvalidEditName}"
                                       class="form-control"
                                       type="text">
                            </div>
                        </td>
                        <td>
                            <div class="input-group has-validation">
                                <input @keydown="contact.isInvalidEditPhone = false"
                                       @keyup.enter="saveContact(index)"
                                       v-model.trim="contact.editingPhone"
                                       :class="{'is-invalid': contact.isInvalidEditPhone}"
                                       class="form-control"
                                       type="text">
                            </div>
                        </td>
                        <td>
                            <div class="row justify-content-end">
                                <div class="col g-2 g-lg-0">
                                    <button @click="saveContact(index)"
                                            class="btn btn-primary me-2"
                                            type="button">
                                        Сохранить
                                    </button>
                                </div>
                                <div class="col g-2 g-lg-0">
                                    <button @click="denyEditingContact(index)"
                                            class="btn btn-danger"
                                            type="button">
                                        Отменить
                                    </button>
                                </div>
                            </div>
                        </td>
                    </template>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div ref="errorModalDialog" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Действие не выполнено</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span v-text="errorDescription"></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Закрыть
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
                    <span>Удалить выбранные контакты?</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Отмена
                    </button>
                    <button @click="deleteContacts" type="button" class="btn btn-danger">
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
            service: new PhoneBookService(),
            editingContactsIndexes: [],
            markedContactsIndexes: [],

            term: "",
            name: "",
            phone: "",

            isInvalidName: false,
            isInvalidPhone: false,
            selectedContactIndex: -1,
            errorDescription: "",
            deleteConfirmDialog: null,
            errorDialog: null
        };
    },

    created() {
        this.loadContacts();
    },

    mounted() {
        this.deleteConfirmDialog = new bootstrap.Modal(this.$refs.deleteConfirmModalDialog, {});
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
            };

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

        saveContact(editingIndex) {
            if (this.contacts[editingIndex].editingName.length === 0) {
                this.showErrorDialog("Поле 'Имя' обязательно для заполнения!");

                this.contacts[editingIndex].isInvalidEditName = true;
            }

            if (this.contacts[editingIndex].editingPhone.length === 0) {
                this.showErrorDialog("Поле 'Телефон' обязательно для заполнения!");

                this.contacts[editingIndex].isInvalidEditPhone = true;
            }

            if (this.contacts[editingIndex].isInvalidEditPhone || this.contacts[editingIndex].isInvalidEditName) {
                return;
            }

            const contact = {
                id: this.contacts[editingIndex].id,
                name: this.contacts[editingIndex].editingName,
                phone: this.contacts[editingIndex].editingPhone
            }

            this.service.updateContact(contact).then(response => {
                if (!response.success) {
                    this.showErrorDialog(response.message);

                    return;
                }

                this.contacts[editingIndex].name = this.contacts[editingIndex].editingName;
                this.contacts[editingIndex].phone = this.contacts[editingIndex].editingPhone;
            }).catch(() => this.showErrorDialog("Контакт не изменен"))

            this.editingContactsIndexes = this.editingContactsIndexes.filter(index => index !== editingIndex);
        },

        showDeleteContactConfirm(selectedIndex) {
            this.selectedContactIndex = selectedIndex;
            this.deleteConfirmDialog.show();
        },

        showErrorDialog(errorText) {
            this.errorDescription = errorText;
            this.errorDialog.show();
        },

        markContact(markingIndex) {
            if (this.markedContactsIndexes.includes(markingIndex)) {
                this.markedContactsIndexes = this.markedContactsIndexes.filter(index => index !== markingIndex)

                return;
            }

            this.markedContactsIndexes.push(markingIndex);
        },

        markAllContacts() {
            if (!this.contacts.length) {
                return;
            }

            if (this.markedContactsIndexes.length === this.contacts.length) {
                this.markedContactsIndexes = [];

                return;
            }

            this.markedContactsIndexes = [];

            this.contacts.forEach((contact, index) => {
                this.markedContactsIndexes.push(index);
            });
        },

        initEditingContact(editingIndex) {
            this.contacts[editingIndex].isInvalidEditName = false;
            this.contacts[editingIndex].isInvalidEditPhone = false;
            this.contacts[editingIndex].editingName = this.contacts[editingIndex].name;
            this.contacts[editingIndex].editingPhone = this.contacts[editingIndex].phone;

            this.editingContactsIndexes.push(editingIndex);
        },

        denyEditingContact(editingIndex) {
            this.contacts[editingIndex].isInvalidEditName = false;
            this.contacts[editingIndex].isInvalidEditPhone = false;

            this.editingContactsIndexes = this.editingContactsIndexes.filter(index => index !== editingIndex);
        },

        deleteContacts() {
            if (!this.markedContactsIndexes.includes(this.selectedContactIndex)) {
                this.markedContactsIndexes.push(this.selectedContactIndex);
            }

            this.markedContactsIndexes.forEach(index => {
                this.deleteContact(this.contacts[index]);
            });

            this.loadContacts();
        },

        async deleteContact(contact) {
            this.deleteConfirmDialog.hide();

            await this.service.deleteContact(contact.id).then(response => {
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
                this.editingContactsIndexes = [];
                this.markedContactsIndexes = [];
            }).catch(() => this.showErrorDialog("Список контактов не загружен"));
        }
    }
};
</script>