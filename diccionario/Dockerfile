FROM python:3.6

RUN pip install zimply

RUN mkdir /zimply
WORKDIR /zimply
ADD run.sh run.py wiktionary_es_all_nopic_2016-12.zim ./
RUN pwd && ls -la 

CMD ["./run.sh"]
