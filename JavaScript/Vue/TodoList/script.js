Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newTodoItemText: "",
                newTodoItemId: 1,
                isInvalid: false
            };
        },

        methods: {
            addTodoItem() {
                if (this.newTodoItemText.length === 0) {
                    this.isInvalid = true;
                } else {
                    this.isInvalid = false;

                    const newTodoItem = {
                        id: this.newTodoItemId,
                        text: this.newTodoItemText
                    };

                    this.items.push(newTodoItem);

                    this.newTodoItemId++;
                    this.newTodoItemText = "";
                }
            },

            deleteTodoItem(deletedItem) {
                this.items = this.items.filter(todoItem => todoItem !== deletedItem);
            }
        },

        template: `
          <form @submit.prevent="addTodoItem" class="row mb-3">
            <div class="col">
              <div class="input-group has-validation">
                <input @keydown="isInvalid = false" 
                       v-model.trim="newTodoItemText"
                       :class="{'is-invalid': isInvalid}" 
                       class="form-control" 
                       type="text">
                <div id="validationInputNewTodoItem" class="invalid-feedback">
                  Необходимо указать текст
                </div>
              </div>
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-primary me-2">Добавить</button>
            </div>
          </form>
          <ul class="list-group list-group-flush">
            <todo-list-item v-for="item in items"
                            :key="item.id"
                            :item="item"
                            @save-item="item.text = $event"
                            @delete-item="deleteTodoItem(item)"></todo-list-item>
          </ul>`
    })

    .component("TodoListItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                isEditing: false,
                editingText: this.item.text,
                isInvalid: false
            };
        },

        methods: {
            save() {
                if (this.editingText.length === 0) {
                    this.isInvalid = true;
                } else {
                    this.isEditing = false;
                    this.$emit("save-item", this.editingText);
                }
            },

            cancel() {
                this.isEditing = false;
                this.editingText = this.item.text;
            }
        },

        template: `
            <li class="mb-3 list-group-item">
                <div v-if="!isEditing" class="row">
                    <div class="col">
                        <span class="me-2">{{ item.text }}</span>
                    </div>
                    <div class="col-auto">
                        <button @click="$emit('delete-item')" class="btn btn-outline-danger me-2" type="button">
                            Удалить
                        </button>
                        <button @click="isEditing = true; isInvalid = false" class="btn btn-outline-primary" type="button">
                            Редактировать
                        </button>
                    </div>
                </div>
                <div v-else class="row">
                    <div class="col input-group has-validation">
                        <input @keydown="isInvalid = false"
                               @keyup.enter="save"
                               v-model.trim="editingText"
                               :class="{'is-invalid': isInvalid}"
                               class="form-control"
                               type="text">
                        <div id="validationEditTodoItem" class="invalid-feedback">
                            Необходимо указать текст
                        </div>
                    </div>
                    <div class="col-auto">
                        <button @click="cancel" class="btn btn-outline-warning me-2" type="button">
                            Отменить
                        </button>
                        <button @click="save" class="btn btn-outline-success" type="button">
                            Сохранить
                        </button>
                    </div>
                </div>
            </li>`
    })
    .mount("#app");