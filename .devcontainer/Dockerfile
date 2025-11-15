FROM oven/bun:alpine

RUN apk update && apk add git bash sudo 
RUN echo "bun ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/bun
RUN chmod 0440 /etc/sudoers.d/bun

USER bun

WORKDIR /workspace

COPY . .

ENV TZ=Asia/Tokyo

CMD [ "bash" ]