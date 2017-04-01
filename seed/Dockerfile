FROM mongo

COPY stations.json /stations.json
COPY rivers.json /rivers.json

CMD mongoimport --host db --db hidrochico --collection rivers --type json --file /rivers.json --jsonArray
CMD mongoimport --host db --db hidrochico --collection stations --type json --file /stations.json --jsonArray
