
set bucket=nicopretorius.com

call npm run build

call aws s3 cp ./dist/nicopretorius s3://%bucket% --recursive --exclude "*" --include "*.ico"
call aws s3 cp ./dist/nicopretorius s3://%bucket% --recursive --exclude "*" --include "*.js"
call aws s3 cp ./dist/nicopretorius s3://%bucket% --recursive --exclude "*" --include "*.html"
call aws s3 cp ./dist/nicopretorius s3://%bucket% --recursive --exclude "*" --include "*.json"
call aws s3 cp ./dist/nicopretorius s3://%bucket% --recursive --exclude "*" --include "*.jpg"

rd /s /q dist