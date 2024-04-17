#!/bin/zsh

# ２回目以降にデプロイIDが更新されないようにするシェル

# １回目だけはclasp deployを使用してデプロイする

# build
npm run build

# clasp push用のディレクトリを作成
mkdir claspDist

# Google App Script上で動かすプログラムファイルをclaspDistにコピー
rsync -a src/server claspDist

# ビルド時に一つのHTMLファイルにバンドルされたクライアント側のコードをclaspDistにコピー
cp dist/index.html claspDist

# appscript.jsonをclaspDistにコピー
cp appsscript.json claspDist

# push
clasp push

# clasp push用のディレクトリを削除
rm -rf claspDist

# get last deployment id
LAST_DEPLOYMENT_ID=$( clasp deployments | pcregrep -o1 '\- ([A-Za-z0-9\-\_]+) @\d+ - web app meta-version' )

if [ -z "$LAST_DEPLOYMENT_ID" ];then
    LAST_DEPLOYMENT_ID=$( clasp deployments | tail -1 | pcregrep -o1 '\- ([A-Za-z0-9\-\_]+)' ) 
fi


# deploy
clasp deploy --deploymentId $LAST_DEPLOYMENT_ID