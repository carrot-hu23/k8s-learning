# 前端 Dockerfile（重点改动：COPY static 目录）
FROM nginx:alpine
# 将当前目录下的 static 目录复制到容器的 /usr/share/nginx/html 目录
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80