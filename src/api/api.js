export default {

    // create_xxx   //创建 新增
    // remove_xxx   // 删除 
    // edit_xxx     // 编辑
    // get_xxx      // 获取

    // index
    get_order_statistics: '/order-statistics',            // 首页订单销售额   
    get_member_statistics: '/member-statistics',          // 首页用户总览  
    get_product_statistics: '/product-statistics',        // 首页商品总览   
    
    // 商品列表api
    get_productList: '/product/list',                     // 产品列表
    regionUrl: '/region/list',                            // 获取所有地区信息
    // get_industry:'/industry/list',                        // 获取行业信息
    get_stockStatus:'/product/stock-status',              // 获取库存状态
    get_list_kindom:'/product/list-kindom',               // 获取金正订单

    // 用户api
    get_member_list:'/member/list',                        // 获取用户列表信息
    get_role_list: '/member/role/list',                    // 获取角色列表
    create_role: '/member/add',                            // 添加用户
    remove_role: '/member/del',                            // 删除用户
    get_single_role: '/member/',                           // 获取单个信息    
    change_reveres_stutas: '/member/reverse',              // 禁用/启用用户
    
    // 用户详情
    get_order_disribution: '/member/order/distribution',           // 获取订单分销用户列表
    get_order_service: '/member/order/service',                    // 获取订单记录订单服务列表
    get_customers_disribution: '/member/distribution-customers',   // 获取订单分销用户列表
    get_customers_service: '/member/order-service-customers',      // 获取订单分销用户列表
    

    // 统计类
   // groupCountUrl: '/member/group-count',                //  统计各类用户
    get_disribution_rule: '/distribution-rule',            //  获取系统设置
    create_disribution_rule: '/distribution-rule/save',    //  添加修改系统设置

    // 订单管理
    get_orderList: '/order/list',                          //  获取订单列表
    set_setTlemnet: '/order/settlement',                   //  结算
    get_settlementStatues: '/order/settlement-statuses',   //  获取结算状态
    get_orderTypes: '/order/types',                        //  获取分销订单类型
    remove_order: '/order/batch-delete',                   //  批量删除
    create_order: '/order/add',                            //  添加订单
    
}