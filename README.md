# k8s-learning

> 这个一个简单的使用k8s部署前后端demo，并且后端使用configmap配置

```txt
前端 Service
  |
  ˅
前端 Pod (Nginx)
  ├── 服务静态资源 /static
  └── 代理 /api/* -> backend-service:9000

后端 Service
  |
  ˅
后端 Pod (SpringBoot)
  ├── 应用配置来自 ConfigMap
  └── 数据库密码来自 Secret
```

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
kubectl applu -f configmap.yaml
```

## 创建 deployment
```shell
kubectl apply -f backend.yaml
kubectl apply -f frontent.yaml
```

## 3. 访问
浏览器访问 http://localhost:30007

## 4. 重启 deployment

```shell
kubectl rollout restart deployment/backend-deployment 
```
