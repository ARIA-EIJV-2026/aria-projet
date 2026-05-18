import shutil

NORMAL_MODEL   = "../backend/models/aria_model.pkl"
POISONED_MODEL = "../backend/models/aria_poisoned.pkl"
BACKUP_MODEL   = "../backend/models/aria_model_backup.pkl"

def attack():
    print("⚠️  ATTAQUE EN COURS — Model Swap...")
    shutil.copy(NORMAL_MODEL, BACKUP_MODEL)
    shutil.copy(POISONED_MODEL, NORMAL_MODEL)
    print("☠️  Modèle remplacé. ARIA est compromise.")
    print("")
    print("👉 Retournez sur ARIA et relancez le diagnostic.")
    print("")
    input("Appuyez sur ENTRÉE pour restaurer le modèle original...")

def restore():
    print("🔄 Restauration du modèle original...")
    shutil.copy(BACKUP_MODEL, NORMAL_MODEL)
    print("✅ Système restauré.")

if __name__ == "__main__":
    attack()
    restore()
