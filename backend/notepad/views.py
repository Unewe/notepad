from django.shortcuts import render, redirect


def index(request):
    return render(request, 'index.html')


def redirect_to_index(request):
    return redirect("/web")
