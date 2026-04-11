import shutil
import time

NORMAL_MODEL   = "../backend/models/aria_model.pkl"
POISONED_MODEL = "../backend/models/aria_poisoned.pkl"
BACKUP_MODEL   = "../backend/models/aria_model_backup.pkl"

def attack():
    print("⚠️  ATTAQUE EN COURS — Model Swap...")
    shutil.copy(NORMAL_MODEL, BACKUP_MODEL)        # sauvegarde
    shutil.copy(POISONED_MODEL, NORMAL_MODEL)      # remplacement
    print("☠️  Modèle remplacé. ARIA est compromise.")

def restore():
    print("🔄 Restauration du modèle original...")
    shutil.copy(BACKUP_MODEL, NORMAL_MODEL)
    print("✅ Système restauré.")

if __name__ == "__main__":
    attack()
    time.sleep(10)   # L'attaque dure 10 secondes
    restore()