# PowerShell script to set environment variables for the cinema booking system

#----- IMPORTANT -----
# FOR WINDOWS POWERSHELL USERS:
# 1 - This is the PowerShell equivalent of set_env.sh
# 2 - Replace the Configuration Placeholders with actual values 
# To run from PowerShell:
#   .\set_env.ps1
#----- IMPORTANT -----

# Neon PostgreSQL Database Configuration
$UPSTASH_REDIS_REST_URL='https://large-grackle-63487.upstash.io'
$UPSTASH_REDIS_REST_TOKEN='Aff_AAIncDFhYzMwNWUyMjAwNmU0N2I5YTNkMWJlNzg4MGRhM2Q0MnAxNjM0ODc'

$GOOGLE_GENERATIVE_AI_API_KEY='AIzaSyBI5lgdfewzHAiVRv43s4Q4TQqrTT6e1DY'

# $ALLOWED_DOMAIN=your-portfolio.vercel.app

$GEMINI_MODEL='gemini-2.5-flash'
$GEMINI_EMBEDDING_MODEL='gemini-embedding-001'

Write-Host "Detected Windows PowerShell. Setting environment variables..."

# Set environment variables for current session
$env:UPSTASH_REDIS_REST_URL = $UPSTASH_REDIS_REST_URL
$env:UPSTASH_REDIS_REST_TOKEN = $UPSTASH_REDIS_REST_TOKEN
$env:GOOGLE_GENERATIVE_AI_API_KEY = $GOOGLE_GENERATIVE_AI_API_KEY
# $env:ALLOWED_DOMAIN = $ALLOWED_DOMAIN
$env:GEMINI_MODEL = $GEMINI_MODEL
$env:GEMINI_EMBEDDING_MODEL = $GEMINI_EMBEDDING_MODEL

# Display the set variables
Write-Host "UPSTASH_REDIS_REST_URL is: $env:UPSTASH_REDIS_REST_URL"
Write-Host "UPSTASH_REDIS_REST_TOKEN is: $env:UPSTASH_REDIS_REST_TOKEN"
Write-Host "GOOGLE_GENERATIVE_AI_API_KEY is: $env:GOOGLE_GENERATIVE_AI_API_KEY"
Write-Host "ALLOWED_DOMAIN is: $env:ALLOWED_DOMAIN"
Write-Host "GEMINI_MODEL is: $env:GEMINI_MODEL"
Write-Host "GEMINI_EMBEDDING_MODEL is: $env:GEMINI_EMBEDDING_MODEL"


Write-Host "`nEnvironment variables have been set for the current PowerShell session."
Write-Host "Note: These variables will only persist for this PowerShell session."