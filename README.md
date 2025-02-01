# k8s-learning

> 这个一个简单的使用k8s部署前后端demo，并且后端使用configmap配置

```txt
前端 Service (NodePort:30007)
  |
  ˅
前端 Pod (Nginx)
  ├── 服务静态资源 /static
  └── 代理 /api/* -> backend-service:9000  # 通过 Service 访问后端
后端 Service (ClusterIP)
  |
  ˅
后端 Pod (SpringBoot)
  ├── 应用配置来自 ConfigMap (backend-config)
  ├── 数据库密码来自 Secret (mysql-secret)
  └── 数据库连接指向 mysql-service:3306  # 通过 Service 访问 MySQL
      |
      ˅
MySQL Service (ClusterIP) + Endpoints
  |
  ˅
外部 MySQL 实例 (内网IP:3306)  # 实际数据库位于集群外
```

## 组件清单

|组件	|类型	|作用	|关键配置示例|
|  ----  | ----  |----  |----  |
|frontend-service	|NodePort	|暴露前端服务，端口 30007	|type: NodePort, nodePort: 30007|
|backend-service	|ClusterIP	|后端服务内部访问入口	|ports: 9000 → 9000
|mysql-service	|ClusterIP	|抽象 MySQL 为集群内服务|	ports: 3306 → 3306|
|backend-config	|ConfigMap	|存储后端应用非敏感配置（如端口）|	server.port: 9000|
|mysql-secret	|Secret	|存储 MySQL |用户名/密码（base64编码）	username: cm9vdA==|

## 1. 创建镜像

**打包后端镜像**
``` shell
cd backend
# 打包 jar
mvn clean package -DskipTests=true
# 打 backend 镜像
docker build -t hujinbo23/k8s-demo-backend:1.0 .

```

**打包前端镜像**
```shell
cd frontend
# 打包 jar
npm install 
npm run build
# 打 frontend 镜像
 docker build -t hujinbo23/k8s-demo-frontend:1.0 .

```

## 2. 创建 configmap
```shell
kubectl apply -f backend-configmap.yaml
```

## 3. 创建 service
```shell
kubectl apply -f mysql-external.yaml
```

## 4. 创建 deployment
```shell
kubectl apply -f backend.yaml
kubectl apply -f frontent.yaml
```

## 5. 访问
浏览器访问 http://localhost:30007

## 6. 重启 deployment

```shell
kubectl rollout restart deployment/backend-deployment 
```
