<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入商品名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSerch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="pager mt-4"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增商品' : '编辑商品'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="商品名"
            prop="name"
            :rules="[{ required: true, message: '商品名是必填项' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入商品名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="价格"
            prop="price"
            :rules="[
              { required: true, message: '价格是必填项' },
              { type: 'number', message: '价格必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.price" placeholder="请输入价格" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="图片地址"
          prop="addr"
          :rules="[{ required: true, message: '图片地址是必填项' }]"
        >
          <el-input v-model="formUser.addr" placeholder="请输入图片地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template> -->
  </el-dialog>
</template>

<script>
import { 
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
} from "vue";

  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance();
      const list = ref([])
      const tableLabel = reactive([
        {
          prop: "name",
          label: "商品名",
        },
        {
          prop: "price",
          label: "价格",
        },
        {
          prop: "addr",
          label: "图片地址",
          width: 320,
        },
      ]);
      onMounted(() => {
        getGoodsData(config);
      })
      const config = reactive({
        total: 0,
        page: 1,
        name: "",
      });
      //获取商品数据
      const getGoodsData = async (config) => {
        let res = await proxy.$api.getGoodsData(config);
        console.log(res, 'res');
        list.value = res.list
        config.total = res.count;
        // return item;
      };
      //分页函数
      const changePage = (page) => {
        // console.log(page);
        config.page = page;
        getGoodsData(config);
      };
      const formInline = reactive({
        keyword: "",
      });
      //搜索函数
      const handleSerch = () => {
        config.name = formInline.keyword;
        getGoodsData(config);
      };
      //控制模态框的显示隐藏
      const dialogVisible = ref(false);
      //右上角关闭回调函数
      const handleClose = (done) => {
        ElMessageBox.confirm("确定关闭吗?")
          .then(() => {
            proxy.$refs.userForm.resetFields();
            done();
          })
          .catch(() => {
            // catch error
          });
      };
      //添加商品的form数据
      const formUser = reactive({
        name: "", //添加商品的用户名
        price: "",
        addr: "",
      });
      //添加商品
      const onSubmit = () => {
        //判断提交时是否所有数据都填写了
        proxy.$refs.userForm.validate(async (valid) => {
          //判断是否通过校验
          if (valid) {
            //如果是添加操作
            if (action.value == "add") {
              let res = await proxy.$api.addGoods(formUser);
              //清空输入框
              if (res) {
                // console.log(proxy.$refs);
                dialogVisible.value = false;
                proxy.$refs.userForm.resetFields();
                getGoodsData(config);
              }
            }
            else {
              //编辑的接口
              let res = await proxy.$api.editGoods(formUser);
              if (res) {
                // console.log(proxy.$refs);
                dialogVisible.value = false;
                proxy.$refs.userForm.resetFields();
                getGoodsData(config);
              }
            }
          }
          else {
            //不管是新增还是编辑没通过校验就报错
            ElMessage({
              showClose: true,
              message: "请输入正确的内容",
              type: "error",
            });
          }
        });
      };
      //取消校验提示框
      const handleCancel = () => {
        dialogVisible.value = false;
        proxy.$refs.userForm.resetFields();
      };
      //区分编辑和新增
      const action = ref("add");
      //编辑商品
      const handleEdit = (row) => {
        //浅拷贝
        action.value = "edit";
        dialogVisible.value = true;
        proxy.$nextTick(() => {
          Object.assign(formUser, row);
        });
      };
      //新增商品
      const handleAdd = () => {
        action.value = "add";
        dialogVisible.value = true;
      };
      //删除商品
      const handleDelete = (row) => {
        ElMessageBox.confirm("你确定删除吗?").then(async () => {
            await proxy.$api.deleteGoods({
              id: row.id,
            });
            ElMessage({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            getGoodsData(config);
          })
          .catch(() => {
            // catch error
          });
      };
      return {
        list,
        tableLabel,
        config,
        changePage,
        formInline,
        handleSerch,
        dialogVisible,
        handleClose,
        formUser,
        onSubmit,
        handleCancel,
        action,
        handleEdit,
        handleAdd,
        handleDelete,

      }
    },
  })
</script>

<style lang="less" scoped>
  .table {
    position: relative;
    height: 520px;
    .pager {
      position: absolute;
      right: 0;
      bottom: -20px;
    }
  }
  .user-header {
    display: flex;
    justify-content: space-between;
  }
</style>

