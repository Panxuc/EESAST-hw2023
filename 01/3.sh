sum=0
for num in {1..100..2}; do
    let sum=$sum+$num;
done
echo $sum > result.txt